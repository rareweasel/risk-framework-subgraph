import { Address } from "@graphprotocol/graph-ts";
import { EthTx, LpV2VaultFactory } from "../../generated/schema";

function getFactoryId(
  factory: Address,
): string {
  return factory.toHexString();
}

export function getOrCreateFactoryIfNeeded(
  factory: Address,
  createdAt: EthTx
): LpV2VaultFactory {
  let id = getFactoryId(factory);
  let entity = LpV2VaultFactory.load(id);
  if (entity == null) {
    entity = new LpV2VaultFactory(id);
    entity.factory = factory;
    entity.blockNumber = createdAt.blockNumber;
    entity.timestamp = createdAt.timestamp;
    entity.createdAt = createdAt.id;
    entity.save();
  }
  return entity as LpV2VaultFactory;
}
