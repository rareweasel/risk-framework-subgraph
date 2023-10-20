import { Address, BigInt } from '@graphprotocol/graph-ts';
import { EthTx, LpV2Vault, LpV2Strategy } from '../../generated/schema';
import { VaultV2 as VaultV2Contract } from '../../generated/curveLpVaultFactory/VaultV2';
import { ZERO_ADDRESS } from './consts';

function getStrategyId(strategy: Address): string {
  return strategy.toHexString();
}

export function createStrategiesFrom(
  vault: LpV2Vault,
  isOnRiskFramework: boolean,
  createdAt: EthTx
): void {
  let vaultContract = VaultV2Contract.bind(Address.fromBytes(vault.vault));

  for (let index = 0; index < 20; index++) {
    const strategy = vaultContract.withdrawalQueue(BigInt.fromI32(index));
    if (strategy.equals(ZERO_ADDRESS)) {
      break;
    }
    getOrCreateStrategy(vault, strategy, isOnRiskFramework, createdAt);
  }
}

function getOrCreateStrategy(
  vault: LpV2Vault,
  strategy: Address,
  isOnRiskFramework: boolean,
  createdAt: EthTx
): LpV2Strategy {
  let id = getStrategyId(strategy);
  let entity = LpV2Strategy.load(id);
  if (entity == null) {
    entity = new LpV2Strategy(id);
    entity.vault = vault.id;
    entity.strategy = strategy;
    entity.isOnRiskFramework = isOnRiskFramework;
    entity.blockNumber = createdAt.blockNumber;
    entity.timestamp = createdAt.timestamp;
    entity.createdAt = createdAt.id;
    entity.save();
  }
  return entity as LpV2Strategy;
}

export function setIsOnRiskFrameworkIfNeeded(
  strategy: Address,
  isOnRiskFramework: boolean,
  setOnRiskFrameworkAt: EthTx
): LpV2Strategy | null {
  let id = getStrategyId(strategy);
  let entity = LpV2Strategy.load(id);
  if (entity !== null && !entity.isOnRiskFramework) {
    entity.isOnRiskFramework = isOnRiskFramework;
    entity.setOnRiskFrameworkAt = setOnRiskFrameworkAt.id;
    entity.save();
    return entity;
  }
  return null;
}
