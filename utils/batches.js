export const divideIntoBatches = ({ data, batchLength }) => {
  const batchLoop = Math.ceil(data.length / batchLength);

  const batches = [];

  for (let i = 0; i < batchLoop; i++) {
    const firstIndex = i * batchLength;

    const lastIndex = i * batchLength + batchLength;

    const currentBatch = data.slice(firstIndex, lastIndex);

    batches.push(currentBatch);
  }

  return batches;
};
