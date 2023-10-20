import {
  ScoreSet as ScoreSetEvent,
  TagSet as TagSetEvent,
  TagRemoved as TagRemovedEvent
} from '../../generated/RiskFramework/RiskFramework';

import * as ethTxs from '../utils/ethTxs';
import * as scores from '../utils/scores';
import * as targets from '../utils/targets';
import * as tags from '../utils/tags';
import * as strategies from '../utils/strategies';
import { log } from '@graphprotocol/graph-ts';
import { FALSE, TRUE } from '../utils/consts';

export function handleScoreSet(event: ScoreSetEvent): void {
  log.info('[RiskFramework] Handle ScoreSet tx: {}', [
    event.transaction.hash.toHexString()
  ]);
  let scoredAt = ethTxs.createEthTxFromEvent(event);
  // Create or get the target.
  let target = targets.getOrCreateTarget(
    event.params.target,
    event.params._network,
    scoredAt
  );
  // Create the score update (history).
  scores.createScoreUpdate(target, event.params.score, scoredAt);
  strategies.setIsOnRiskFrameworkIfNeeded(event.params.target, TRUE, scoredAt);
  // Update the target with the latest score.
  let latestScore = scores.updateOrCreateScore(
    target,
    event.params.score,
    scoredAt
  );
  targets.updateTarget(target, latestScore);
}

export function handleTagSet(event: TagSetEvent): void {
  log.info('[RiskFramework] Handle TagSet tx: {}', [
    event.transaction.hash.toHexString()
  ]);
  let tagSetAt = ethTxs.createEthTxFromEvent(event);
  let target = targets.getTarget(event.params.target, event.params._network);
  tags.createTagUpdate(target, event.params.tag.toString(), FALSE, tagSetAt);
  tags.getOrCreateTag(target, event.params.tag.toString(), tagSetAt);
}

export function handleTagRemoved(event: TagRemovedEvent): void {
  log.info('[RiskFramework] Handle TagRemoved tx: {}', [
    event.transaction.hash.toHexString()
  ]);
  let tagRemovedAt = ethTxs.createEthTxFromEvent(event);
  let target = targets.getTarget(event.params.target, event.params._network);
  tags.createTagUpdate(target, event.params.tag.toString(), TRUE, tagRemovedAt);
  tags.removedTag(target, event.params.tag.toString(), tagRemovedAt);
}
