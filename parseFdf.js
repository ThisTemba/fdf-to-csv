function mergeObjects(objectList) {
  const newObject = {};
  objectList.forEach((o) => {
    Object.keys(o).forEach((key) => {
      newObject[key] = o[key];
    });
  });
  return newObject;
}

function getLongestRow(collection) {
  let longestRow = collection[0];
  collection.forEach((row) => {
    const numRowKeys = Object.keys(row).length;
    const numLongestRowKeys = Object.keys(longestRow).length;
    if (numRowKeys > numLongestRowKeys) {
      longestRow = row;
    }
  });
  return longestRow;
}

function transposeCollection(collection) {
  const longestRow = getLongestRow(collection);
  const transposed = Object.keys(longestRow).map((key) => {
    const values = collection.map((row) => {
      return { [row.name]: row[key] } || { [row.name]: "" };
    });
    return mergeObjects([{ name: key }, ...values]);
  });
  return transposed.slice(1);
}

function chunksToCollection(chunks, minCommentLen) {
  const pageRegex = /Page \d*/;

  return chunks
    .filter((chunk) => {
      const contents = chunk.split("Contents(")[1]?.split(")/")[0];
      return contents && contents.length > minCommentLen;
    })
    .map((chunk) => {
      const comment = chunk.split("Contents(")[1].split(")/")[0];
      const author = chunk.split("/T(")[1].split(")/")[0];
      const pdfPage = parseInt(chunk.match(pageRegex)[0].split(" ")[1]) + 1;
      return { comment, author, pdfPage };
    });
}

function fdfToChunks(rawData) {
  const fdf = rawData;
  const chunks = fdf.split("endobj");
  return chunks;
}

function fdfToCollection(fdf, minCommentLen) {
  const chunks = fdfToChunks(fdf);
  const collection = chunksToCollection(chunks, minCommentLen);
  return collection;
}

function collectionToCsv(collection) {
  const header = Object.keys(collection[0]);
  const rows = collection.map((row) => Object.values(row));
  const csv = [header, ...rows]
    .map((row) => {
      return row
        .map((cell) => {
          if (typeof cell === "string") {
            let string = cell
              .replaceAll('"', '""')
              .replaceAll("\\r", "")
              .replaceAll("\\(", "(")
              .replaceAll("\\)", ")")
              .replaceAll("��", "")
              .replaceAll("\\\r", "");
            string = `"${string}"`;
            return string;
          } else return cell;
        })
        .join(",");
    })
    .join("\r\n");
  return csv;
}

function fdfToCommentResponse(fdf, minCommentLen) {
  const collection = fdfToCollection(fdf, minCommentLen);
  const csv = collectionToCsv(collection);
  return csv;
}
