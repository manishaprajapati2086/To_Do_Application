import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonMockService } from '../common-mock.service';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  lst_ToDo: any;
  StatusChanged(index, $ev) {
    var sel_val = $ev.target.checked;
    this.lst_ToDo[index].Status = sel_val;
  };
  SelectAll($ev) {
    var sel_val = $ev.target.checked;
    var self = this;
    $.each(self.lst_ToDo, function (index, value) {
      self.lst_ToDo[index].Status = sel_val;
    });
  };
  DeleteSelectedToDos() {
    var getCompletedTodo = this.lst_ToDo.filter(x => x.Status == true);
    if (getCompletedTodo.length > 0) {
      if (confirm('Are you sure want to delete all selected To-Dos')) {
        var self = this;
        $.each(self.lst_ToDo, function (index, value) {
          if (value) {
            if (value.Status) {
              self.lst_ToDo.splice(index, 1);
            }
          }
        });
      }
    } else {
      alert('Please select atleast one todo !!');
    }
  };

  // #region Model
  To_Do_form: FormGroup;
  Model_Title: any;
  Edit_Data: any;
  Edit_Index: any;
  @ViewChild('ToDoModel') ToDoModel: ModalDirective;

  ToDoModel_Open() {
    this.Edit_Data = false;
    this.Model_Title = "Add To Do";
    this.To_Do_form.reset();
    this.ToDoModel.show();
  };
  ToDoModel_Close() {
    this.ToDoModel.hide();
  };
  ToDoModel_Save($ev, values) {
    $ev.preventDefault();
    for (let c in this.To_Do_form.controls) {
      this.To_Do_form.controls[c].markAsTouched();
    }
    if (this.To_Do_form.valid) {
      if (this.Edit_Data) {
        var status1 = this.lst_ToDo[this.Edit_Index].Status;
        this.lst_ToDo[this.Edit_Index] = {
          Task: values.task,
          Date: values.date,
          Status: status1
        };
      } else {
        this.lst_ToDo.push({
          Task: values.task,
          Date: values.date,
          Status: false
        });
      }
      this.ToDoModel.hide();
    }
  };
  ToDoModel_Edit(index, values) {
    this.Edit_Data = true;
    this.Edit_Index = index;
    this.Model_Title = "Edit To Do";
    this.To_Do_form.patchValue({
      task: values.Task,
      date: values.Date
    });
    this.ToDoModel.show();
  };
  ToDo_Remove(index) {
    if (confirm('Are you sure want to delete this to do?')) {
      this.lst_ToDo.splice(index, 1);
    }
  };
  // #endregion

  constructor(private fb: FormBuilder, private _cS: CommonMockService) {
    this.To_Do_form = this.fb.group({
      'task': [null, Validators.required],
      'date': [null, Validators.required]
    });
  }

  ngOnInit() {
    Promise.all([this._cS.getToDoList()])
      .then(([lst_ToDO]) => {
        this.lst_ToDo = lst_ToDO;
      });
  }

}
