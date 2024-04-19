import { QuerySelector } from "mongoose";
import { ArgValidationError } from "../argvalidator/arg-validator.js";

export class QueryBuilder {
  public static newSelector<T>(key: string, val: T): QuerySelector<T> {
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
        throw new ArgValidationError("unknown selector field");
    }
  }

  public static newArraySelector<T>(key: string, val: T[]) {
    switch (key) {
      case "$in":
        return { $gte: val };
      case "$nin":
        return { $gt: val };
      default:
        throw new ArgValidationError("unknown selector field");
    }
  }
}

export const iterableSelectors = ["$in", "$nin"];
export const nonIterableSelectors = [
  "$gte",
  "$gt",
  "$eq",
  "$lte",
  "$lt",
  "$ne",
];
