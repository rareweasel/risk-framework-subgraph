import { Address, BigInt, Bytes } from '@graphprotocol/graph-ts';
import { EthTx, Score, Target } from '../../generated/schema';
import * as tags from './tags';

function getNetworkUrl(networkId: BigInt, target: string): string {
  switch (networkId.toI32()) {
    case 1:
      return 'https://etherscan.io/address/'.concat(target);
    case 56:
      return 'https://bscscan.com/address/'.concat(target);
    case 137:
      return 'https://polygonscan.com/address/'.concat(target);
    case 8453:
      return 'https://basescan.org/address/'.concat(target);
    case 250:
      return 'https://ftmscan.com/address/'.concat(target);
    case 43114:
      return 'https://snowtrace.io/address/'.concat(target);
    case 10:
      return 'https://optimistic.etherscan.io/address/'.concat(target);
    case 59144:
      return 'https://lineascan.build/address/'.concat(target);
    case 42161:
      return 'https://arbiscan.io//address/'.concat(target);
    default:
      return 'Invalid URL';
  }
}

function getTargetId(
  target: Address,
  networkId: BigInt,
): string {
  return target.toHexString().concat('-').concat(networkId.toString());
}

export function getTarget(
  target: Address,
  networkId: BigInt,
): Target {
  let id = getTargetId(target, networkId);
  let entity = Target.load(id);
  return entity as Target;
}

export function getOrCreateTarget(
  target: Address,
  networkId: BigInt,
  tx: EthTx
): Target {
  let id = getTargetId(target, networkId);
  let entity = Target.load(id);
  if (entity == null) {
    entity = new Target(id);
    entity.address = target;
    entity.targetUrl = getNetworkUrl(networkId, target.toHexString());
    entity.networkId = networkId;
    entity.createdAt = tx.id;
    entity.blockNumber = tx.blockNumber;
    entity.timestamp = tx.timestamp;
    entity.save();
  }
  return entity as Target;
}

export function updateTarget(
  target: Target,
  latestScore: Score
): Target {
  target.score = latestScore.id;
  target.save();
  return target;
}

export function updateTags(
  target: Address,
  tag: string,
  tagsList: Bytes[],
  createdAt: EthTx
): Target {
  let id = target.toHexString();
  let entity = Target.load(id) as Target;

  for (let i = 0; i < tagsList.length; i++) {
    tags.getOrCreateTag(
      entity,
      tagsList[i].toHexString(),
      createdAt
    );
  }
  entity.save();
  return entity;
}