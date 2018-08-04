module.exports= {
	getNews : async function(req, res){
		var categoryId = req.body.categoryId;		
		var dataNews = await CmsNews.find({
			where:{'categoryId': categoryId, 'status': 1},			
			sort: 'ordering ASC'
		}).populate('ref_new_comments');
		res.json(dataNews);
	},
	getGifts: async function(req, res){
		var dataCategories = await CoreCategories.find({
			where: {status: 1, 'parent': 137}
		});
		var categoryIds = [];
		for(var i = 0; i < dataCategories.length; i++) {
			categoryIds.push(dataCategories[i].id);
		}
		var dataNews = await CmsNews.find({
			where:{'status': 1, categoryId: categoryIds},
			sort: 'ordering ASC',
			limit: 5
		}).populate('ref_new_comments');
		res.json(dataNews);
	},
	postComments: async function(req, res){
		var newsId = req.body.newsId;
		var content = req.body.content;
		var userId = req.body.userId;
		var ip = req.body.ip;
		var createCommnet = await CmsNewComments.create({
			'newsId': newsId,
			'content': content,
			'userId': userId,
			'ip': ip
		}).fetch();
		res.json(createCommnet);
	}
};