import { Injectable, inject } from '@angular/core';

import { Message, MessageService } from 'primeng/api';

type MessageConfig = 'severity' | 'summary' | 'detail';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly messagesService = inject(MessageService);

  private add(config: Message) {
    this.messagesService.add(config);
  }

  success(
    message: string,
    title = 'Success',
    config: Partial<Omit<Message, MessageConfig>> = {}
  ) {
    this.add({
      severity: 'success',
      summary: title,
      detail: message,
      life: 5_000,
      ...config,
    });
  }

  error(
    message: string,
    title = 'Error',
    config: Partial<Omit<Message, MessageConfig>> = {}
  ) {
    this.add({
      severity: 'error',
      summary: title,
      detail: message,
      life: 10_000,
      ...config,
    });
  }
}
