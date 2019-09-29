import { exec } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { decode, encode } from 'iconv-lite';
import { dirname, basename } from 'path';

if (process.argv.length < 3) process.exit(0);

const thPath = process.argv[2];

exec(`chcp 65001 && "touhouSE/touhouSE.exe" --cui --select-regex thbgm.fmt^|musiccmt.txt "${thPath}"`, () => {
    const names = readMusicCmt();
    const data = readThbgm(names);

    const no = Object.keys(names)[0].slice(2, -3);
    const dir = basename(dirname(thPath));

    const outputText = encode(
        `#「${dir}」曲データ\n\n` +
        `@${thPath.replace(/\//g, '\\')},${dir}\n\n` +
        `${data}`, 'Shift_JIS');

    writeFileSync(`titles_th${no}.txt`, outputText);

    exec('rd /s /q touhouSE\\data');
});

function readThbgm(names: {[key: string]: string}): string {
    let result: string[] = [];

    const file = readFileSync('touhouSE/data/thbgm.fmt');

    for (let index = 0; index < file.length; index++) {
        if (file[index] == 0x74) {
            // 曲ファイル名
            const key = (new TextDecoder).decode(Uint8Array.from([...Array(16).keys()].map(i => { return file[index + i] }).filter(x => x !== 0))).slice(0, -4);
            index += 16;

            // 開始位置
            const start = Buffer.from([...Array(4).keys()].map(i => { return file[index + i] }).reverse()).toString('hex').toUpperCase();
            index += 4;

            // 曲の長さ
            const length = Buffer.from([...Array(4).keys()].map(i => { return file[index + i] }).reverse()).toString('hex').toUpperCase();
            index += 4;

            // イントロ部の長さ
            const intro = Buffer.from([...Array(4).keys()].map(i => { return file[index + i] }).reverse()).toString('hex').toUpperCase();
            index += 4;

            // ループ部の長さ
            const loop = ('00000000'+(parseInt(`0x${length}`) - parseInt(`0x${intro}`)).toString(16)).slice(-8).toUpperCase();

            // 曲名
            const name = names[key] || key;

            result.push(`${start},${intro},${loop},${name}`);

            index += 23;
        }
    }

    return result.join('\n');
}

function readMusicCmt(): {[key: string]: string} {
    let result: {[key: string]: string} = {};
    
    try {
        const file = decode(readFileSync('touhouSE/data/musiccmt.txt'), 'Shift_JIS').split('\r\n');
        file.forEach((line, index) => {
            if (line.startsWith('@bgm/')) {
                result[line.slice(5).replace('.wav', '')] = file[index + 1].slice(6).trim();
            }
        });
    }
    catch {}

    return result;
}