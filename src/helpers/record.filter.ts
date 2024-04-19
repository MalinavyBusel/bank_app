import { ModelFilter } from "../storage/repository/base.repository.js";
import { QuerySelector } from "mongoose";
import { ObjectId } from "mongodb";

export function filterRecord<T>(record: T, filter: ModelFilter<T>): boolean {
  for (const [filterKey, filterVal] of Object.entries(filter)) {
    if (
      !ObjectId.isValid(filterVal as string) &&
      typeof filterVal === "object"
    ) {
      if (
        !valueMatchesSelector<T>(
          filterVal as QuerySelector<T[keyof T]>,
          record[filterKey as keyof T],
        )
      ) {
        return false;
      }
    } else if (ObjectId.isValid(filterVal as string)) {
      return (filterVal as ObjectId).equals(
        record[filterKey as keyof T] as ObjectId,
      );
    } else {
      if (record[filterKey as keyof T] != filterVal) return false;
    }
  }
  return true;
}

function valueMatchesSelector<T>(
  selector: QuerySelector<T[keyof T]>,
  value: T[keyof T],
) {
  return Object.entries(selector)
    .map((entry) => {
      const [k, v] = entry;
      switch (k) {
        case "$in":
          return (v as Array<unknown>)
            .map((elem) => String(elem))
            .includes(String(value));
        case "$nin":
          return !(v as Array<unknown>)
            .map((elem) => String(elem))
            .includes(String(value));
        case "$gte":
          return value >= v;
        case "$gt":
          return value > v;
        case "$eq":
          return value === v;
        case "$lte":
          return value <= v;
        case "$lt":
          return value < v;
        case "$ne":
          return value !== v;
        default:
          throw new Error(
            `unknown selector field after query creation: '${k}'`,
          );
      }
    })
    .reduce((accumulator, currentValue) => accumulator && currentValue, true);
}
