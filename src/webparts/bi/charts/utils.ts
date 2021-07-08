export const max = (data: Array<number>) => {
    let maxValue: number = data[0];

    data.forEach((element) => {
        if (element > maxValue) {
            maxValue = element;
        }
    });
    return maxValue;
};
