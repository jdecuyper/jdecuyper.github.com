TeamPicker = function(teams){
	this.teams = teams;
	this.current = 0;
	this.excluded = 0;

}

TeamPicker.prototype.setCurrent = function(index){
	this.current = index;
}

TeamPicker.prototype.exclude = function(index){
	this.excluded = index;

}

TeamPicker.prototype.getNext = function(){
	this.current++;
	if (this.current == this.excluded){
		this.current++;
	}
	if (this.current >= this.teams.length){
		this.current = 0;
	}
	if (this.current == this.excluded){
		this.current++;
	}
	return this.teams[this.current];

}

TeamPicker.prototype.getPrevious = function(){
	this.current--;
	if (this.current == this.excluded){
		this.current--;
	}
	if (this.current < 0){
		this.current = this.teams.length-1;
	}
	if (this.current == this.excluded){
		this.current--;
	}
	return this.teams[this.current];

}

TeamPicker.prototype.getCurrent = function(){
	return this.teams[this.current];
}