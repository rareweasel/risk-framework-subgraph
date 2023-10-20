import {
    NewAutomatedVault as NewAutomatedVaultEvent,
    NewAutomatedVault1 as NewAutomatedVault1Event,
    NewAutomatedVault2 as NewAutomatedVault2Event,
  } from "../../generated/curveLpVaultFactory/GenericLpVaultFactory";
  
  import * as ethTxs from "../utils/ethTxs";
  import * as factories from "../utils/factories";
  import * as vaults from "../utils/vaults";
  import * as strategies from "../utils/strategies";
  import { log } from "@graphprotocol/graph-ts";
import { FALSE } from "../utils/consts";
  
  export function handleNewAutomatedVault_1(event: NewAutomatedVaultEvent): void {
    log.info("[GenericLpVaultFactory_1] Handle NewAutomatedVault tx: {}", [event.transaction.hash.toHexString()]);
    let newAutomatedVaultCreatedAt = ethTxs.createEthTxFromEvent(event);

    let factory = factories.getOrCreateFactoryIfNeeded(event.address, newAutomatedVaultCreatedAt);

    let lpVaultV2 = vaults.getOrCreateVault(
        event.params.vault,
        event.params.gauge,
        event.params.lpToken,
        factory,
        newAutomatedVaultCreatedAt
    );

    strategies.createStrategiesFrom(
        lpVaultV2,
        FALSE,
        newAutomatedVaultCreatedAt
    );
  }
  
  export function handleNewAutomatedVault_2(event: NewAutomatedVault1Event): void {
    log.info("[GenericLpVaultFactory_2] Handle NewAutomatedVault tx: {}", [event.transaction.hash.toHexString()]);
    let newAutomatedVaultCreatedAt = ethTxs.createEthTxFromEvent(event);

    let factory = factories.getOrCreateFactoryIfNeeded(event.address, newAutomatedVaultCreatedAt);
    
    let lpVaultV2 = vaults.getOrCreateVault(
        event.params.vault,
        event.params.gauge,
        event.params.lpToken,
        factory,
        newAutomatedVaultCreatedAt
    );

    strategies.createStrategiesFrom(
        lpVaultV2,
        FALSE,
        newAutomatedVaultCreatedAt
    );
  }
  
  export function handleNewAutomatedVault_3(event: NewAutomatedVault2Event): void {
    log.info("[GenericLpVaultFactory_3] Handle NewAutomatedVault tx: {}", [event.transaction.hash.toHexString()]);
    let newAutomatedVaultCreatedAt = ethTxs.createEthTxFromEvent(event);

    let factory = factories.getOrCreateFactoryIfNeeded(event.address, newAutomatedVaultCreatedAt);

    let lpVaultV2 = vaults.getOrCreateVault(
        event.params.vault,
        event.params.gauge,
        event.params.lpToken,
        factory,
        newAutomatedVaultCreatedAt
    );

    strategies.createStrategiesFrom(
        lpVaultV2,
        FALSE,
        newAutomatedVaultCreatedAt
    );
  }
  