# NX, Commercetools, AWS Lambdas, and GraphQL

This project is a boilerplate for integrating Commercetools with your backend using AWS Lambda functions, GraphQL, and Nx for monorepo management.


https://github.com/user-attachments/assets/adb1a9e9-e2f5-416b-b5fe-aa5aaa95fa76




## Project Structure

```
ecommerce/
├── apps/
│   └── services/
│       ├── add-to-cart/          # Lambda service for cart operations
│       │   ├── src/
│       │   │   └── main.ts
│       │   ├── package.json
│       │   └── tsconfig.json
│       └── gateway/              # Lambda GraphQL gateway service
│           ├── src/
│           │   ├── main.ts
│           │   └── commercetools/
│           │       └── schemaLoad/
│           │           └── index.ts
│           ├── package.json
│           ├── template.yaml     # AWS SAM template for deployment
│           └── tsconfig.json
├── package.json                  # Workspace root dependencies
├── nx.json                       # Nx workspace configuration
├── tsconfig.base.json            # Base TypeScript config
└── README.md                     # This file
```

## Key Features

- **Nx Monorepo:** Easily manage multiple apps and services with Nx.
- **AWS Lambda Functions:** Each service is deployable as a Lambda using AWS SAM.
- **GraphQL Gateway:** The `gateway` service stitches remote schemas, including Commercetools, and exposes a unified GraphQL API.
- **Commercetools Integration:** Utilities for loading and integrating Commercetools GraphQL schemas.
- **TypeScript:** All code is written in TypeScript for type safety.

## Getting Started

### Prerequisites

- Node.js 20+
- Yarn
- Nx CLI (`yarn global add nx`)
- AWS CLI & AWS SAM CLI

### Install Dependencies

```sh
yarn install
```

### Build Services

```sh
nx build gateway
nx build add-to-cart
```

### Run Locally

You can run the gateway service locally using SAM:

```sh
nx serve gateway
# or directly
sam local start-api -t apps/services/gateway/template.yaml --port 4000
```

### Deploy to AWS

```sh
nx build gateway
sam build --template-file apps/services/gateway/template.yaml
sam deploy --guided --template-file apps/services/gateway/template.yaml
```

## Environment Variables

Set environment variables in `template.yaml` under the `Environment` section for each Lambda function.

## Customization

- Add new Lambda services under `apps/services/`.
- Update GraphQL schema stitching logic in `apps/services/gateway/src/main.ts`.
- Extend E2E tests in `apps/ecommerce-e2e/`.

## More Information

- See the `gateway` service for how Commercetools GraphQL schema is loaded and stitched.
- Refer to Nx documentation for workspace management: https://nx.dev

---

Feel free to contribute or use this boilerplate for your own Commercetools integrations!
