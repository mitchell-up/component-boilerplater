import fs from 'fs-extra'

const config = 'boilerplate.config.json';

export function readConfig() {
  fs.readFile(config, 'utf8', (err, data) => {
    const config = JSON.parse(data);
  
    // config 데이터 사용 예시
    console.log('사용자 이름:', config.baseDir);
    console.log('사용자 이메일:', config.ext);
  });
}