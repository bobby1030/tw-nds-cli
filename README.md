# tw-nds-cli
A cli interface for http://www.dgpa.gov.tw/nds.html   
天然災害停止上班及上課情形 CLI 查詢界面

## Installation
You'll need NodeJS to run this program.
```shell
git clone https://github.com/bobby1030/tw-nds-cli.git && cd tw-nds-cli
npm install
ln -s $PWD/tw-nds /usr/local/bin
```

## Usage
```shell
tw-nds [City Name in ISO 3166-2:TW format]
```

## Examples
```shell
tw-nds TPE
> 今天未達停止上班及上課標準。
tw-nds KHH
> 今天已達停止上班及上課標準。
tw-nds Taipei
> Please use a City Code that match ISO 3166-2:TW format.
```

## References
* [ISO 3166-2:TW 定義表 (From Wikipedia)](https://wikipedia.org/wiki/ISO_3166-2:TW)

## License
MIT

## TODOs
- [ ] 同縣市有多種狀態時的例外處裡
