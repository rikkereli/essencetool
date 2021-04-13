import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'
import * as jspdf from 'jspdf';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import html2canvas from 'html2canvas';
import { ProjectService } from 'src/app/services/project.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CategoryOverviewComponent } from '../utilities/category-overview/category-overview.component';
import { PrintCategoryOverviewComponent } from '../utilities/print-category-overview/print-category-overview.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = "ESSENCE";
  constructor(
    public authService: AuthService, 
    public categoryService: CategoryService,
    private modalService: NgbModal,
    public projectService: ProjectService,
    public navbarService: NavbarService,
    public matDialog: MatDialog, 
  
    ) { 
      navbarService.onProjectActivityPage = false;
    }

  ngOnInit(): void {
    this.categoryService.getUserDiagrams().valueChanges();
  }

  openDiagram() {
    const dialogConfig = new MatDialogConfig();
    // The user should be able to close dialog when clicking outside
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "inherit";
    dialogConfig.width = "fit-content";
    dialogConfig.panelClass = "panel"; 
    const modalDialog = this.matDialog.open(CategoryOverviewComponent, dialogConfig);
  }
  // Get help for the specific page
  getHelp(help) {
    this.modalService.open(help, {ariaLabelledBy:"modal-basic-title"}).result.then((res)=>{});
  }

  goToProjects() {
    this.projectService.setCurrentProject("projects");
  }
  goToProfile() {
    this.projectService.setCurrentProject("profile");
  }
  exportAsPdf(printPage) {
    const dialogConfig = new MatDialogConfig();
    // The user should be able to close dialog when clicking outside
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "inherit";
    dialogConfig.width = "fit-content";
    dialogConfig.panelClass = "panel"; 
    const modalDialog = this.matDialog.open(PrintCategoryOverviewComponent, dialogConfig);

    setTimeout(() => {
      let data = document.getElementById('printPage');
      html2canvas(data).then(canvas => {
        var pdf = new jspdf.jsPDF('p', 'pt', [canvas.width, canvas.height])
        var imgData = canvas.toDataURL("image/jepg", 1.0);
        pdf.addImage(imgData,0,0,canvas.width, canvas.height)
        //let HTML_Width = canvas.width;
        //let HTML_Height = canvas.height;
        //let top_left_margin = 15;
        //let PDF_Width = HTML_Width + (top_left_margin*2);
        //let PDF_Height = (PDF_Width*1.5) + (top_left_margin*2);
        //let totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
        //canvas.getContext('2d');
        //let imgData = canvas.toDataURL('image/pdf');
        //let pdf = new jspdf.jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
        //pdf.addImage(imgData, 'PDF', top_left_margin, top_left_margin, HTML_Width, HTML_Height);
        //for(let i = 1; i <= totalPDFPages; i++) {
          //pdf.addPage([PDF_Width, PDF_Height], 'p');
          //pdf.addImage(imgData, 'pdf', top_left_margin, -(PDF_Height * i) + (top_left_margin*4), HTML_Width,HTML_Height)
        //}
        pdf.save("configurationTable.pdf")
        modalDialog.close();
      })
    }, 2000)
  }

  inviteUserToProject() {
    var textbox =  (<HTMLInputElement>document.getElementById('emailInput')).value;
    this.projectService.inviteUserToProject(textbox);
  }

  addUserToProject(invite) {
    this.modalService.open(invite, {ariaLabelledBy:"modal-basic-title"}).result.then((res)=>{});
  }
  openWordList() {
    
  }
}
