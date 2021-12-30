import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(private quizService: QuizService, private router: Router ) { }

  ngOnInit(): void {
  }

  RegisterClick(data: any){
    this.quizService.registerUser(data).subscribe();
    alert('Registered Successfully');
    this.router.navigate(['login']);

  }

}
