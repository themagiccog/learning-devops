import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  person = { name: "James", age: 26 }
  stringInterpolation: string = "Hello World String";
  numberInterpolation: number = 50;
  isActive: boolean = false;
  colorforeground = "blue";
  buttonDisabled = true;

  showPerson(){
    alert(this.person.name + " " + this.person.age);
  }

  onTest(){ 
    return true; 
  }

  onClicked(){
     alert("Event Binding Works!")
  }
  constructor() { }
  ngOnInit(): void { }
}
