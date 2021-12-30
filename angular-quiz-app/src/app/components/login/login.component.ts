import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private quizService: QuizService, private router: Router) { }

  users: any[] = [];

  ngOnInit(): void {
    this.quizService.getUser().subscribe(
      data => this.users = data
    );
  }

  LoginClick(data: any) {
    //alert(this.users[0].Email +"---" + data.Email);
    for ( var user of this.users){
      if (user.Email === data.Email && user.Password === data.Password){
        this.router.navigate(['quiz']);
        break;
      }
      else{
        this.router.navigate(['login']);
      }
    }
  }
}
