import { log } from '@graphprotocol/graph-ts';
import { EthTx, Tag, TagUpdate, Target } from '../../generated/schema';

function getTagId(target: string, tag: string): string {
  return target.concat('-').concat(tag.toString());
}

export function getOrCreateTag(target: Target, tag: string, tx: EthTx): Tag {
  let id = getTagId(target.address.toHexString(), tag);
  let entity = Tag.load(id);
  if (entity == null) {
    entity = new Tag(id);
    entity.target = target.id;
    entity.value = tag;
    entity.createdAt = tx.id;
    entity.blockNumber = tx.blockNumber;
    entity.timestamp = tx.timestamp;
    entity.removed = false;
    entity.save();
  }
  return entity as Tag;
}

export function removedTag(target: Target, tag: string, tx: EthTx): void {
  let id = getTagId(target.address.toHexString(), tag);
  log.info('[Tags] Remove tag id {} from target {}', [id, target.id]);
  let tags = target.tags.load();
  let totalTags = tags.length;

  for (let index = 0; index < totalTags; index++) {
    let tagId = tags[index].id;
    if (tagId == id) {
      let entity = Tag.load(id) as Tag;
      entity.removed = true;
      entity.save();
      break;
    }
  }
}

export function createTagUpdate(
  target: Target,
  tag: string,
  removed: boolean,
  tx: EthTx
): TagUpdate {
  let id = getTagId(target.address.toHexString(), tag);
  log.info('[Tags] Creating tag update id {} for target {}', [id, target.id]);
  let entity = TagUpdate.load(id);
  if (entity == null) {
    entity = new TagUpdate(id);
    entity.target = target.id;
    entity.value = tag;
    entity.txAt = tx.id;
    entity.blockNumber = tx.blockNumber;
    entity.timestamp = tx.timestamp;
    entity.removed = removed;
    entity.save();
  }
  return entity as TagUpdate;
}
