export const max = (data: Array<number>) => {
    let maxValue: number = data[0];

    data.forEach((element) => {
        if (element > maxValue) {
            maxValue = element;
        }
    });
    return maxValue;
};


import { Bins } from '@visx/mock-data/lib/generators/genBins';

const defaultCount = (idx: number, number: number): number => {
  return Math.random() * (25 * (number - idx));
};

const defaultBin = (idx: number, _length: number):number => {
  return idx * 150;
};

export const genBin = (
  length: number,
  bin: typeof defaultBin,
  count: typeof defaultCount,
  index: number,
): Bins => {
  let binFunc = bin;
  let countFunc = count;
  if (binFunc === undefined) {
    binFunc = defaultBin;
  }

  if (countFunc === undefined) {
    countFunc = defaultCount;
  }

  return new Array(length).fill(1).reduce((data, _d, i) => data.concat([{
    bin: binFunc(i, length),
    count: countFunc(index, length),
  }]), []);
};

export const genBins = (
  length: number,
  height: number,
  bin: typeof defaultBin,
  count: typeof defaultCount,
): Bins[] => new Array(length).fill(1).reduce((arr, _, i) => arr.concat([{
  bin: i,
  bins: genBin(height, bin, count, length - i),
}]), []);
