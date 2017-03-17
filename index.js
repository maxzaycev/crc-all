const algorythms = {
	'crc8': (crcParams) => {
		return (data) => {
	    	let crc = crcParams.init;

		    data.forEach((d) => {
		        crc = crcParams.array[d ^ crc];
		    });

		    crc = crc ^ crcParams.xorOut;

		    return crc;
		}
	},

	'crc16': (crcParams) => {
		return (data) => {
	    	let crc = crcParams.init;

		    if (crcParams.refOut)
		        data.forEach((d) => {
		            crc = crcParams.array[(d ^ crc) & 0xFF] ^ (crc >> 8 & 0xFF);
		        });
		    else
		        data.forEach((d) => {
		            crc = crcParams.array[((crc >> 8) ^ d) & 0xFF] ^ (crc << 8);
		        });

		    crc = crc ^ crcParams.xorOut;

		    return crc;
		}
	},

	'crc32': (crcParams) => {
		return (data) => {
		    let crc = crcParams.init;

		    if (crcParams.refOut)
		        data.forEach((d) => {
		            crc = crcParams.array[(d ^ crc) & 0xFF] ^ (crc >> 8 & 0xFFFFFF);
		        });
		    else
		        data.forEach((d) => {
		            crc = crcParams.array[((crc >> 24) ^ d) & 0xFF] ^ (crc << 8);
		        });

		    crc = crc ^ crcParams.xorOut;

		    return crc;
		}
	}
}

function getCrcType(crcName){
	return crcName.split('-', 1)[0];
}

module.exports = (crcName) => {
	let type = getCrcType(crcName);
	let crcParams

	try {
		crcParams = require('./' + type + '/' + crcName);
	}
	catch(e) {
		console.error(e);
	}

	return (crcParams && (typeof algorythms[type] === 'function')) ? 
		algorythms[type](crcParams) : null;
}