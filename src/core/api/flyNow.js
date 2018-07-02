import { Lead } from '../salesforce';
import moment from 'moment';
import { SFCountry } from '../../data/models';
import MobileDetect from 'mobile-detect';

const flyNow = async (req, res, next) => {
	try {
		const md = new MobileDetect(req.headers['user-agent']);
		const homeCountry = await SFCountry.findOne({ where: { country_code__c: req.body.ipInfo.country } });
		
		Lead.create({
			LastName: 'Website > Fly Now > Request A Call',
			phone: req.body.phone,
			Company: 'N/A',
			Lead_type__c: 'Passenger',
			Status: 'Pending',
			Quote_source__c: `${(md.mobile()) ? 'M' : '' }WCNM`, // missing var to check if is member or not
			Quote_msg__c: 'Website > Fly Now > Request A Call',
			Lead_Origin_Country__c: homeCountry.sfid, // sfid country
			Home_Country__c: req.body.browser.locale, // browser locale
			Platform_Language__c: req.body.website.locale.toUpperCase(),
			Lead_Source_Medium__c: 'website',
		}, function(err, response) {
		  
		  	if (err || !response.success) { return console.error(err, response); }
		  	res.status(200).json(response);

		});
	} catch (e) {
    console.error(e);
    next(e);
	}
};

export default flyNow;