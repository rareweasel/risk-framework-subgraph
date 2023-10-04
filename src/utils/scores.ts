import { BigInt, dataSource } from "@graphprotocol/graph-ts";
import { EthTx, Score, ScoreUpdate, Target } from "../../generated/schema";
import { getId } from "./commons";
import { RiskFramework } from "../../generated/RiskFramework/RiskFramework";

function getAverageScore(score: BigInt): BigInt {
  let riskFrameworkContract = RiskFramework.bind(dataSource.address());
  let scoresList = riskFrameworkContract.fromScoreToList(score);
  return scoresList.getAverageScore();
}

function getScoresAsString(score: BigInt): string {
  let riskFrameworkContract = RiskFramework.bind(dataSource.address());
  let scoresList = riskFrameworkContract.fromScoreToList(score);
  return scoresList.getScoresList().join(",");
}

export function updateOrCreateScore(
  target: Target,
  score: BigInt,
  createdAt: EthTx
): Score {
  let averageScore = getAverageScore(score);
  let scoresAsString = getScoresAsString(score);
  let id = getId(createdAt);
  let entity = Score.load(id);
  if (entity == null) {
    entity = new Score(id);
    entity.target = target.id;
    entity.score = score;
    entity.scores = scoresAsString;
    entity.averageScore = averageScore;
    entity.blockNumber = createdAt.blockNumber;
    entity.timestamp = createdAt.timestamp;
    entity.createdAt = createdAt.id;
  } else {
    entity.score = score;
    entity.averageScore = averageScore;
    entity.blockNumber = createdAt.blockNumber;
    entity.timestamp = createdAt.timestamp;
    entity.createdAt = createdAt.id;
  }
  entity.save();
  return entity as Score;
}

export function createScoreUpdate(
  target: Target,
  score: BigInt,
  createdAt: EthTx
): ScoreUpdate {
  let averageScore = getAverageScore(score);
  let scoresAsString = getScoresAsString(score);
  let id = getId(createdAt);
  let entity = ScoreUpdate.load(id);
  if (entity == null) {
    entity = new ScoreUpdate(id);
    entity.target = target.id;
    entity.score = score;
    entity.scores = scoresAsString;
    entity.averageScore = averageScore;
    entity.blockNumber = createdAt.blockNumber;
    entity.timestamp = createdAt.timestamp;
    entity.createdAt = createdAt.id;
    entity.save();
  }
  return entity as ScoreUpdate;
}
