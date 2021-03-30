/** 日期格式化
 *  date: 日期；
 *  mode: 模式 Y年 M月 D日
 */
function dateFormat(date, mode = 'YMD') {
	let _date = new Date(date),
		_return = '';
		
	mode.split('').forEach((v,k)=>{
		if(k > 0) _return += '-';
		switch(v) {
			case 'Y':
				_return += _date.getFullYear();
				break;
			case 'M':
				_return += _date.getMonth() < 9 ? '0'+(_date.getMonth()+1) : _date.getMonth()+1;
				break;
			case 'D':
				_return += _date.getDate() < 10 ? '0'+(_date.getDate()) : _date.getDate();
		}
	});
	
	return _return;
}

/**
 * 生成随机key
 */
function randomKey() {
	let random = Math.floor(Math.random()*100000),
		time = new Date();
	
	return 'b'+random +'a'+ time.getTime();
}

/**
 * 取出两个数组中不同的元素
 * arr1, arr2 数组
 */
function getArrDifference(arr1, arr2) {
	return arr1.concat(arr2).filter(function(v, i, arr) {
		return arr.indexOf(v) === arr.lastIndexOf(v);
	});
}

//复制对象
function copyObj(obj) {
	return JSON.parse(JSON.stringify(obj));
}

export default {
	dateFormat,
	randomKey,
	getArrDifference,
	copyObj
}