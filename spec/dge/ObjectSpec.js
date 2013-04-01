describe('dge.Object', function() {

	it('extends base object', function() {
		var Class = dge.Object.extend({
			'test': 'property'
		});
		var inst = new Class;
		expect(inst.test).toBe('property');
		expect(typeof inst.clone).toBe('function');
		expect(typeof inst.extend).toBe('function');
	});

	it('clones date object', function() {
		var date = new Date('1.1.2013');
		var cloneDate = dge.Object.clone(date);
		cloneDate.setFullYear(2012);
		expect(date.getFullYear()).toBe(2013);
		expect(cloneDate.getFullYear()).toBe(2012);
	});

	it('clones an array', function() {
		var array = ['jasmine', 'test'];
		var cloneArray = dge.Object.clone(array);
		cloneArray.splice(1, 1);
		expect(cloneArray.length).toBe(1);
		expect(array.length).toBe(2);
	});

	it('clones an object', function() {
		var obj = {
			'key': 'value'
		};
		var cloneObj = dge.Object.clone(obj);
		delete cloneObj.key;
		expect(obj.key).toBe('value');
		expect(cloneObj.key).toBeUndefined();
	});

});