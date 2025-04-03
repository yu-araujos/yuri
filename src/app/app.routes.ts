import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './core/features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];
