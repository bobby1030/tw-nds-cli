# tw-nds-cli
A cli interface for http://www.dgpa.gov.tw/nds.html   
天然災害停止上班及上課情形 CLI 查詢界面

## Usage
```shell
node app.js [City Name in ISO 3166-2:TW format]
```

## Examples
```shell
node app.js TPE
> 今天未達停止上班及上課標準。
node app.js KHH
> 今天已達停止上班及上課標準。
node app.js Taipei
> Please use a City Code that match ISO 3166-2:TW format.
```

## References
* [ISO 3166-2:TW 定義表 (From Wikipedia)](https://wikipedia.org/wiki/ISO_3166-2:TW)

## License
MIT

## TODOs
- [ ] 同縣市有多種狀態時的例外處裡
