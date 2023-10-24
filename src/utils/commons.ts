import { BigInt, ethereum } from '@graphprotocol/graph-ts';
import { EthTx } from '../../generated/schema';

export function getTimeInMs(time: BigInt): BigInt {
  return time.times(BigInt.fromI32(1000));
}

export function getTimestampInMs(block: ethereum.Block): BigInt {
  return block.timestamp.times(BigInt.fromI32(1000));
}

export function getId(tx: EthTx): string {
  return tx.hash
    .toHexString()
    .concat('-')
    .concat(tx.logIndex.toString());
}
