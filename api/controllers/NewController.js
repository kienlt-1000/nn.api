module.exports= {
	getNews : async function(req, res){
		/*var categoryId = req.body.categoryId;*/
		var categoryId = 139;
		var dataNews = await CmsNews.find({
			where:{'categoryId': categoryId, 'status': 1},			
			sort: 'ordering ASC'
		});
		res.json(dataNews);
	}
};