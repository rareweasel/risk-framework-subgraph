# Risk Framework Subgraph

## Configuration & Deploy

- Configuration
`graph auth --product hosted-service <access-token>`

- Deploy
`yarn deploy:network`

> network can be `base`, `polygon`, `ethereum` or `optimism`.

- Prepare Subgraph Configuration for a Network (ready for deployment)

`yarn codegen:polygon`

`yarn codegen:ethereum`

`yarn codegen:base`

`yarn codegen:optimism`

## Subgraph URL

- Polygon
  - [Subgraph](https://thegraph.com/hosted-service/subgraph/yearn/yearn-risk-framework)
  - [API](https://api.thegraph.com/subgraphs/name/yearn/yearn-risk-framework)
- Ethereum
  - [Subgraph](https://thegraph.com/hosted-service/subgraph/yearn/yearn-risk-framework-ethereum)
  - [API](https://api.thegraph.com/subgraphs/name/yearn/yearn-risk-framework-ethereum)
- Base
  - [Subgraph](https://thegraph.com/hosted-service/subgraph/yearn/yearn-risk-framework-base)
  - [API](https://api.thegraph.com/subgraphs/name/yearn/yearn-risk-framework-base)
- Optimism
  - [Subgraph](https://thegraph.com/hosted-service/subgraph/yearn/yearn-risk-framework-optimism)
  - [API](https://api.thegraph.com/subgraphs/name/yearn/yearn-risk-framework-optimism)
