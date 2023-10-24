import { Address } from '@graphprotocol/graph-ts';
import { EthTx, LpV2VaultFactory, LpV2Vault } from '../../generated/schema';

function getVaultId(vault: Address): string {
  return vault.toHexString();
}

export function getOrCreateVault(
  vault: Address,
  gauge: Address,
  lpToken: Address,
  factory: LpV2VaultFactory,
  createdAt: EthTx
): LpV2Vault {
  let id = getVaultId(vault);
  let entity = LpV2Vault.load(id);
  if (entity == null) {
    entity = new LpV2Vault(id);
    entity.vault = vault;
    entity.factory = factory.id;
    entity.gauge = gauge;
    entity.lpToken = lpToken;
    entity.blockNumber = createdAt.blockNumber;
    entity.timestamp = createdAt.timestamp;
    entity.createdAt = createdAt.id;
    entity.save();
  }
  return entity as LpV2Vault;
}
