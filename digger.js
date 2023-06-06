function diggerPrompts (file) {
  const result = {};
  return new Promise(res => {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', function () {
      if (/parameters/.test(fileReader.result)) {
        const prompt = (/parameters\x00(.*)/.exec(fileReader.result) || [])[1];
        const negativePrompt = (/Negative prompt: (.*)/.exec(fileReader.result) || [])[1];
        const others = (/(Steps.*), ENSD/.exec(fileReader.result) || [])[1];
        const paramsArr = others.split(',');
        const params = {};
        paramsArr.forEach(str => {
          const temp = str.split(':');
          params[temp[0].trim()] = temp[1].trim();
        })
        Object.assign(result, {
          prompt,
          negativePrompt,
          ...params,
        })
        res(result);
      } else {
        res(null);
      }
    });
    fileReader.readAsText(file);
  });
}