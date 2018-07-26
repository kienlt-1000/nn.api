module.exports = {
	// Hàm trả về 1 bản ghi trong bảng test, với input: testId
	getTest: async function(req, res){
		var testId= req.body.test_id;
		var dataTest= await EducationTests.findOne({'id': testId});
		res.json(dataTest);

	},
	//Hàm trả về mảng các câu hỏi và câu trả lời( đề trắc nghiệm ) với input testId
	getQuestionsAnswers: async function(req, res){
		var testId= req.body.test_id;		
		testId = '%,'+testId+ ',%';
		var dataQuestions = await EducationQuestions.find({
			where: {
				'testId': { like:  testId}
			},
			select:['id', 'request', 'name', 'name_vn', 'testId', 'questionType', 'status', 'audio', 'translation', 'hasImage', 'hasAudio', 'medias']
		}).populate('ref_question_answers');
		res.json(dataQuestions);
	},
	//Hàm trả về mảng các câu hỏi và câu trả lời( đề tự luận ) với input testId
	getQuestionsAnswersTl: async function(req, res){
		var testId= req.body.test_id;
		
		testId = '%,'+testId+ ',%';
		var dataQuestions = await EducationQuestions.find({
			where: {
				'testId': { like:  testId}
			}
		});
		res.json(dataQuestions);
	},
	
};