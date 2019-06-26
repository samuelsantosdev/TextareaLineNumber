export function loadConfigs(ConfigDefault, ConfigCustom)
{
	const config = {};
	for (var attrname in ConfigDefault) { config[attrname] = ConfigDefault[attrname]; }
	for (var attrname in ConfigCustom) { config[attrname] = ConfigCustom[attrname]; }
	return config;
}

export function eventKey(element, event, callback){
	//set a addEventListener
	switch(event){
		case 'scroll':
			element.addEventListener('scroll', function(e){
				callback(e);
			});
		break;
		case 'keyup':
			element.addEventListener('keyup', function(e){
				callback(e);
			});
		break;
	}
}