# Mango Drink CI/CD and QA Automation

This project has two automation layers:

1. Application CI/CD in this repository.
2. QA CI automation in a separate repository that is triggered after deployment.

The objective is simple: every successful deployment should immediately trigger Selenium QA checks against the live URL.

## Repository Structure

- Frontend app (Vite + React): this repository root
- Deploy workflow: .github/workflows/ci-cd.yml
- Local QA suite source mirror: QA-automation/
- External QA pipeline target repo: defined by QA_REPO_OWNER and QA_REPO_NAME in the workflow environment

## End-to-End Flow

When code is pushed to main (or CI/CD is started manually), this is the sequence:

1. Build and push container image to Docker Hub.
2. SSH into the VM, pull latest image, recreate container, and validate service endpoint.
3. Send a repository_dispatch event to the QA repository.
4. QA repository receives event type run-qa-tests and executes Selenium tests.

This architecture keeps deployment and test ownership separated while still providing an automated chain.

## CI/CD Workflow Deep Dive

Source file: .github/workflows/ci-cd.yml

### Triggers

- push to main
- workflow_dispatch for manual execution

### Global Environment Variables

- IMAGE_NAME: Docker image name suffix
- CONTAINER_NAME: runtime container name on VM
- APP_PORT: internal container port (6666)
- APP_EXPOSED_PORT: public VM port (8081)
- APP_SCHEME: current health-check scheme (http)
- DEPLOY_HOST: VM host/IP
- VM_USER and VM_PORT: SSH connection settings
- QA_REPO_OWNER and QA_REPO_NAME: target repository for QA dispatch

### Job 1: build_and_push

Purpose: produce immutable container artifact for deployment.

Key actions:

- Checkout source
- Setup Docker Buildx
- Login to Docker Hub using repository secrets
- Build and push two tags:
	- latest
	- commit-specific tag using github.sha

Why both tags matter:

- latest is convenient for deployment simplicity
- sha tag gives traceability for rollbacks and debugging

### Job 2: deploy

Depends on: build_and_push

Purpose: update VM runtime with newest image.

Remote script behavior:

- Docker login on VM
- Pull latest image
- Stop/remove old container if present
- Start new container with restart policy
- Map APP_EXPOSED_PORT to APP_PORT
- Prune dangling images
- Health check with curl against deployed endpoint

If health check fails, deploy job fails and QA trigger does not run.

### Job 3: trigger_external_qa

Depends on: deploy

Purpose: trigger QA pipeline in external repository.

Mechanism:

- Action used: peter-evans/repository-dispatch@v2
- Event type: run-qa-tests
- Payload keys sent:
	- app_url
	- username
	- password

Payload contract (logical structure):

```json
{
	"app_url": "http://<deploy-host>:<exposed-port>",
	"username": "<app-username>",
	"password": "<app-password>"
}
```

## QA CI Workflow Deep Dive

Source file in QA repo: .github/workflows/qa-ci.yml

Current trigger configuration:

```yaml
on:
	repository_dispatch:
		types: [run-qa-tests]
```

### What QA job does

1. Checkout QA repository code
2. Print incoming event payload for debugging
3. Setup Java 21 (Temurin)
4. Setup Chrome for headless UI tests
5. Run Maven tests with env variables mapped from dispatch payload

Environment mapping used by tests:

- APP_BASE_URL <- github.event.client_payload.app_url
- APP_USERNAME <- github.event.client_payload.username
- APP_PASSWORD <- github.event.client_payload.password

This must align with how the Java Selenium tests read config values.

## Why QA Might Not Start Automatically

If manual trigger works but dispatch does not, the most common causes are:

1. Wrong token scope
- QA_TRIGGER_TOKEN must have access to the target QA repo.
- For classic PAT, repo scope is required for private repos.

2. Workflow file not on default branch of QA repo
- repository_dispatch triggers workflows from the default branch version.
- If qa-ci.yml changes exist only in another branch, dispatch appears to do nothing.

3. Event type mismatch
- Sender uses run-qa-tests.
- Receiver must listen to exactly run-qa-tests.

4. Target repo mismatch
- QA_REPO_OWNER or QA_REPO_NAME points to wrong repository.

5. Actions permissions/policies
- Organization or repository policies may block third-party actions or external dispatch.

6. Trigger job skipped because deploy failed
- trigger_external_qa has needs: deploy.
- Any deploy failure prevents QA trigger from running.

7. Invalid payload or missing secrets
- Empty APP_USERNAME or APP_PASSWORD can still trigger QA, but tests will fail quickly.

## Verification Checklist

Use this checklist to validate auto-trigger end to end:

1. In deployment repo secrets, confirm values exist:
- DOCKERHUB_USERNAME
- DOCKERHUB_TOKEN
- VM_PASSWORD
- APP_USERNAME
- APP_PASSWORD
- QA_TRIGGER_TOKEN

2. In ci-cd.yml env, confirm QA target values:
- QA_REPO_OWNER
- QA_REPO_NAME

3. In QA repo default branch, confirm qa-ci.yml includes:
- on.repository_dispatch.types contains run-qa-tests

4. Run CI/CD once from main push.

5. Confirm trigger_external_qa job is green in deployment repo.

6. In QA repo Actions tab, confirm a run started with event repository_dispatch.

7. Open Show dispatch payload step logs and verify payload keys are present.

## Required Secrets and Variables

Create these in deployment repository settings:

- DOCKERHUB_USERNAME
- DOCKERHUB_TOKEN
- VM_PASSWORD
- APP_USERNAME
- APP_PASSWORD
- QA_TRIGGER_TOKEN

Configured in workflow env (not as secrets in current file):

- VM_USER
- VM_PORT
- DEPLOY_HOST
- IMAGE_NAME
- CONTAINER_NAME
- APP_PORT
- APP_EXPOSED_PORT
- QA_REPO_OWNER
- QA_REPO_NAME

Note: README previously listed QA_REPO_OWNER and QA_REPO_NAME as secrets, but in the current workflow they are defined directly in env.

## Local Commands

- npm install
- npm run build
- npm run docker:build
- npm run docker:run

For local QA run from QA-automation folder:

```bash
mvn test \
	-Dapp.baseUrl=http://192.99.71.97:8081 \
	-Dapp.username=<username> \
	-Dapp.password=<password>
```

## Security Guidance

- Never hardcode PATs or credentials in workflow YAML.
- Keep QA_TRIGGER_TOKEN minimal scope and rotate periodically.
- Prefer organization/repository secrets over plain env values for sensitive data.
- Avoid printing sensitive values in logs; payload debugging should not expose secrets in plain text in production environments.