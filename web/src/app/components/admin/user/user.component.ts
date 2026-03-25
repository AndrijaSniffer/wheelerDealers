import {Component, inject} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem} from "@angular/material/list";
import {MatMiniFabButton} from "@angular/material/button";
import {NotificationService} from '@services/notification.service';
import {MatDialog} from '@angular/material/dialog';
import {AppUtil} from '../../../app.util';
import {UserService} from '@services/user.service';
import {User} from '@classes/user';
import {YesNoDialogComponent} from '@dialogs/dialogs.component';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatList,
    MatListItem,
    MatMiniFabButton,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    DatePipe
  ],
  templateUrl: './user.component.html',
  standalone: true,
  styleUrl: './user.component.css'
})
export class UserComponent {
  private readonly _notification = inject(NotificationService);
  private readonly _userService = inject(UserService);
  private readonly _dialog = inject(MatDialog);

  displayedColumns = ['id', 'username', 'PIB', 'email', 'isSuperuser', 'isActive', 'isReseller', 'phone', 'address',
    'dateJoined', 'lastLogin', 'options'];
  dataSource: MatTableDataSource<User>;
  private users: User[];

  constructor() {
    this.getAll();
  }

  getAll() {
    this._userService.getAll().subscribe({
      next: data => {
        this.users = data;
        this.dataSource = new MatTableDataSource(this.users);
      },
      error: err => {
        console.error(err);
        this._notification.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(err.error));
      }
    });
  }

  ban(id: number) {
    const selectedUser = this.users.find(u => u.id === id);

    this._dialog.open(YesNoDialogComponent, {
      data: `Are you sure you want to ban this user?\n${AppUtil.toRawJSONText(selectedUser)}`,
    }).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._userService.banUserById(id).subscribe({
          next: _ => {
            this._notification.showTimedNotification('User successfully banned!');
            this.getAll();
          },
          error: err => {
            console.error(err);
            this._notification.showTimedErrorNotification('Error banning user.');
          }
        })
      }
    });
  }
}
