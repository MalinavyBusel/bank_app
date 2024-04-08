import { QuerySelector } from "mongoose";

export abstract class FindCommand {
  public newNumberSelector<T>(key: string, val: T): QuerySelector<T> {
    switch (key) {
      case "$gte":
        return { $gte: val };
      case "$gt":
        return { $gt: val };
      case "$eq":
        return { $eq: val };
      case "$lte":
        return { $lte: val };
      case "$lt":
        return { $lt: val };
      case "$ne":
        return { $ne: val };
      default:
        return {};
    }
  }

  public newArraySelector<T>(key: string, val: T[]) {
    switch (key) {
      case "$in":
        return { $gte: val };
      case "$nin":
        return { $gt: val };
      default:
        return {};
    }
  }
}
