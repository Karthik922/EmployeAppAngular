import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-departmentlist',
  templateUrl: './departmentlist.component.html',
  styleUrls: ['./departmentlist.component.css']
})
export class DepartmentlistComponent implements OnInit {

  todo : any ;
  constructor(private _service: DepartmentService) {

    this._service.getTodoData()
    .subscribe(data => {
      this.todo = data
      console.log(data);
    });
  
   }
   @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  private _grdlistData!: MatTableDataSource<any>;
  public get grdlistData(): MatTableDataSource<any> {
    return this._grdlistData;
  }
  public set grdlistData(value: MatTableDataSource<any>) {
    this._grdlistData = value;
  }
  displayedColumns: string[] = ['deptname', 'ordno', 'actions'];

  ngOnInit(): void {
    this.fillGrid();
  }
  fillGrid(){
    this._service.getAllDepartment().subscribe(
      data => {
        this.grdlistData = new MatTableDataSource(data);
        this.grdlistData.paginator = this.paginator;
      }
    );
  }

}
