echo off
chcp 65001

cd %~dp0

call yarn
call yarn setup