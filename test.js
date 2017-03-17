const fs = require('fs');
const assert = require('assert');
const moduleDir = './';

const crcDirs = ['crc8/', 'crc16/', 'crc32/'];

let testCount = 0;
let passCount = 0;

crcDirs.forEach((dir) => {
		const crcFiles = fs.readdirSync( moduleDir + dir);

		crcFiles.forEach((file) => {
			if (file.substr(-5) == '.json'){
				const check = require(moduleDir + dir + file).check;
				const crcType = file.split('.')[0];
				const byteArray = [0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39];
				const crc = require(moduleDir)(crcType)(byteArray);
				
				console.log(crcType);
				if(crc == check){
					console.log('PASS');
					++passCount;
				}
				else{
					console.warn('WRONG')
				}
				console.log(crc.toString(16));
				console.log(check.toString(16));
				console.log();

				++testCount;
			}
	});
});

console.log(passCount, '/', testCount);