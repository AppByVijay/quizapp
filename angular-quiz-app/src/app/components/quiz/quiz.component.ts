import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Option, Question, Quiz, QuizConfig } from 'src/app/models';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quizes: any[];
  quiz: Quiz = new Quiz(null);
  mode = "quiz";
  quizName: string;
  config: QuizConfig = {
    allowBack: false,
    allowReview: false,
    autoMove: true, // if true, it will move to next question automatically when answered.
    pageSize: 1,
    requiredAll: false, // indicates if you must answer all the questions before submitting.
    richText: false,
    shuffleQuestions: false,
    shuffleOptions: false,
    showPager: true,
    theme: "none"
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };

  constructor(private quizService: QuizService,private router: Router) { }

  ngOnInit(): void {
    this.quizes = this.quizService.getAll();
    this.quizName = this.quizes[0].id;
    this.loadQuiz(this.quizName);
  }

  loadQuiz(quizName: string) {
    let getQuestion = this.quizService.get(quizName);
    this.quiz = new Quiz(getQuestion);
    this.pager.count = this.quiz.questions.length;
    this.mode = "quiz";
  }

  get filteredQuestions() {
    return this.quiz.questions
      ? this.quiz.questions.slice(
          this.pager.index,
          this.pager.index + this.pager.size
        )
      : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach(x => {
        if (x.id !== option.id) x.selected = false;
      });
    }
    
    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = "quiz";
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? "Answered" : "Not Answered";
  }

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer)
      ? "correct"
      : "wrong";
  }

  onSubmit() {
    let answers = [];
    this.quiz.questions.forEach(x =>
      answers.push({
        quizId: this.quiz.id,
        questionId: x.id,
        answered: x.answered
      })
    );

    // Post your data to the server here. answers contains the questionId and the users' answer.
    this.mode = "result";
  }


}
