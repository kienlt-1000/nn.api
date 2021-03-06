module.exports= {
	// Hàm lấy chủ đề của các môn học
	getTopics: async function(req, res){
		var subject_id = req.body.subject_id;
		subject_id = '%,'+ subject_id +',%';
		var software = req.body.software || 1;
    	var site = req.body.site || 1;
		var dataTopics = await CoreCategories.find({
			where: {
				'status': 1,
				'display': 1,
				'document': 0,
				'parents': { like: subject_id},
				'classes': {like : '%,5,%'},
				'software': software,
				'site': [0, site],
				// 'displayAtSite': [0, 1]
			},
			sort: ['ordering ASC','id ASC']
		});
		return res.json(dataTopics);
	},
	getVocabularyTopics: async function(req, res){
		var subject_id = req.body.subject_id;
		subject_id = '%,'+ subject_id +',%';
		var software = req.body.software || 1;
    	var site = req.body.site || 1;
		var dataTopics = await CoreCategories.find({
			where: {
				'status': 1,
				'display': 1,
				'document': 1,
				'parents': { like: subject_id},
				'classes': {like : '%,5,%'},
				'software': software,
				'site': [0, site],
				'displayAtSite': [0, site]
			},
			sort: 'ordering ASC'
		});
		return res.json(dataTopics);
	},
	// Lấy tư vựng các môn
	getVocabularies: async function(req, res){
		var subject_id = req.body.subject_id;
		var software = req.body.software || 1;
    	var site = req.body.site || 1;
		var datagetVocabularies = await EducationDocuments.find({
			where: {
				'status': 1,				
				'categoryId': subject_id,
				'classes': {like : '%,5,%'},
				'type': 'vocabulary',
				'hidden': 0,
				'software': software,				
			},
			sort: 'ordering ASC'
		});
		return res.json(datagetVocabularies);
	},
	// Lấy danh sách bài tập
	getExercises: async function(req, res){
		var subject_id = parseInt(req.body.subject_id);
		var page_limit = 5;
		var software = req.body.software || 1;
    	var site = req.body.site || 1;
		if( subject_id === 88) {
			page_limit = 10;
		}
		var topic_id = parseInt(req.body.topic_id);
		topic_id = '%,'+topic_id+',%';
		var getQuantity = await EducationQuestions.count({
			where: {
				'status': 1,				
				'categoryIds':{ like:  topic_id},
				'classes': {like : '%,5,%'},
				'software': software					
			}
		});
		getQuantity = Math.ceil(getQuantity/page_limit);
		return res.json(getQuantity);
	},
	// Lấy câu hỏi của bài tập
	getExerciseQuestions: async function(req, res){
		var subject_id = parseInt(req.body.subject_id);
		var topic_id = parseInt(req.body.topic_id);
		var exercise_number = parseInt(req.body.exercise_number);
		var page_limit = 5;
		var software = req.body.software || 1;
    	var site = req.body.site || 1;
		if(subject_id === 88) {
			page_limit = 10;
			exercise_number = 1;
		}
		var skip_records = page_limit*(exercise_number-1);
		var dataQuestions = await EducationQuestions.find({
			where: {
				'status': 1,				
				'categoryIds':{ like:  '%,'+topic_id+',%'},
				'classes': {like : '%,5,%'},
				'software': software				
			},
			select:['id', 'request', 'name', 'name_vn', 'categoryIds', 'questionType', 'status', 'audio', 'translation', 'hasImage', 'hasAudio', 'medias'],
			limit: page_limit,
			skip: skip_records,
			sort: 'ordering ASC'			
		}).populate('ref_question_answers');
		res.json(dataQuestions);
	},
	// Lấy câu hỏi của bài tập Quan Sat
	getAllExerciseQuestions: async function(req, res){
		var subject_id = req.body.subject_id;
		var topic_id = req.body.topic_id;
		var software = req.body.software || 1;
    	var site = req.body.site || 1;		
		var dataQuestions = await EducationQuestions.find({
			where: {
				'status': 1,				
				'categoryIds':{ like:  '%,'+topic_id+',%'},
				'classes': {like : '%,5,%'},
				'software': software
			},
			select:['id', 'request', 'name', 'name_vn', 'categoryIds', 'questionType', 'status', 'audio', 'translation', 'hasImage', 'hasAudio', 'medias'],
			sort: 'ordering ASC'			
		}).populate('ref_question_answers');
		res.json(dataQuestions);
	},
	// Hàm update kết quả bài làm của hs
	updateUserBooks : async function(req, res){
		var questions = req.body.questions;
		var categoryId = req.body.subject_id;
		var topic = req.body.topic_id;
		var mark = req.body.mark;
		var userId = req.body.userId;
		var duringTime = req.body.duringTime;
		var startTime = new Date(req.body.startTime*1000);
		var stopTime = new Date(req.body.stopTime * 1000);
		var exercise_number = req.body.exercise_number;
		var quantity_question = req.body.quantity_question;
		var lang = req.body.lang == '' ? 'en': req.body.lang;
		var keybook = '' + topic + userId + startTime;
		var software = req.body.software || 1;
    	var site = req.body.site || 1;
		var md5 = require('md5');
		keybook =md5(keybook);
		var S = require('string');
		keybook = S(keybook).left(13).toString();
		//update bang user_book
		var userbook= await EducationUserBooks.create({
			'categoryId': categoryId,
			'topic': topic,
			'mark' : mark,
			'userId' : userId,
			'duringTime' : duringTime,
			'exercise_number' : exercise_number,
			'quantity_question' : quantity_question,
			'lang' : lang,
			'status' : 1,			
			'keybook' : keybook,
			'software': software,
			'parentTest': 0,
			'testId': 0,
			'startTime': startTime,
			'stopTime':stopTime
		}).fetch();
		//update bang user_answers
		questions.forEach( async function(question, index) {
			var user_book_id = userbook['id'];
			var questionId = question['questionId'];
			var answerId = question['answerId']; 
			var status = question['status'];
			await EducationUserBookAnswers.create({
				'user_book_id': user_book_id,
				'questionId': questionId,
				'answerId': answerId,
				'status': status
			});
		});
		res.json(1);
	}

};