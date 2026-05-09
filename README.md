# Mango Drink CI/CD

This repository now includes a build-and-deploy pipeline for the React app plus a separate Maven Selenium suite under `QA-automation/`.

## Local commands

- `npm install`
- `npm run build`
- `npm run docker:build`
- `npm run docker:run`

The Docker image is built from source using the multi-stage `dockerfile`, so CI does not depend on a pre-generated `dist/` directory.

## GitHub Actions flow

The workflow in `.github/workflows/ci-cd.yml` does the following:

1. Builds the app image and pushes it to Docker Hub.
2. SSHes into the VM at `192.99.71.97` and starts the container on port `6666`.
3. Runs the Selenium checks from `QA-automation/` against the deployed site.

## Required secrets

Create these GitHub repository secrets before enabling the workflow:

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`
- `VM_USER`
- `VM_PASSWORD`
- `APP_USERNAME`
- `APP_PASSWORD`
 - `QA_TRIGGER_TOKEN` (a personal access token with `repo` scope used to trigger the QA repository)
 - `QA_REPO_OWNER` (owner/org of the QA repository)
 - `QA_REPO_NAME` (name of the QA repository)

If your VM uses a nonstandard SSH port, update the `VM_PORT` value in the workflow. The default is `22`.

## QA automation

The Selenium test suite lives in `QA-automation/` and uses Chrome in headless mode. It expects the application login form to accept the provided credentials from secrets and then verifies the authenticated landing page loads.

If your QA tests live in a separate repository, the deploy step triggers that repository via the `repository_dispatch` event. The QA repository must have a workflow configured to listen for `repository_dispatch` (or for a custom event) and consume the `client-payload`. Example `on` entry in the QA repo workflow:

```yaml
on:
	repository_dispatch:
		types: [run-qa-tests]
```

The QA workflow can access the dispatched payload via `github.event.client_payload.app_url`, `github.event.client_payload.username`, and `github.event.client_payload.password`.

Security note: `QA_TRIGGER_TOKEN` should be a minimal-scope PAT stored as a repository secret in this repo. Do NOT hardcode tokens in workflows.
