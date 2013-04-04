describe('dge.GameTime', function() {

	var gameTime, spyListener;
	beforeEach(function() {
		gameTime = new dge.GameTime(60);

		spyListener = jasmine.createSpy();
	});

	it('creates GameTime', function() {
		expect(gameTime.frameRate).toBe(60);
		expect(gameTime.frames).toBe(0);
		expect(gameTime.elapsedTime).toBe(0);
		expect(gameTime.elapsedTotalTime).toBe(0);
	});

	it('triggers listener to GameTime tick event', function() {
		gameTime.addListener('test', spyListener);
		gameTime.triggerListeners();
		expect(spyListener).toHaveBeenCalledWith(gameTime);
	});

	it('should not trigger listener to GameTime tick event', function() {
		gameTime.addListener('test', spyListener);
		gameTime.removeListener('test');
		gameTime.triggerListeners();
		expect(spyListener).not.toHaveBeenCalled();
	});

	it('updates GameTime', function() {
		gameTime.last = new Date('1.1.2000');
		gameTime.update();
		expect(gameTime.elapsedTime).toBeGreaterThan(0);
		expect(gameTime.elapsedTotalTime).toEqual(gameTime.elapsedTime);
	});

});