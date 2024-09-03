import { api } from './api';

import { Hono } from "hono";
import { readFile } from 'node:fs/promises';
import * as path from 'node:path';

function routing(app: Hono) {
    app.get('/', (c) => {
    return c.text('Hello Hono!')
    })
    app.route('/', api);


    app.get('/json', (c) => {
    return c.json({
        abc: "hello",
        def: "world"
    });
    })

    app.get('/download-csv', async (c) => {
    // return c.redirect('/static/csv/data.csv')  // CSVファイルのURLにリダイレクト
    const filePath = path.join(__dirname, 'data.csv')  // CSVファイルのパス

    // Content-Typeを設定
    c.header('Content-Type', 'text/csv')
    
    // ファイル名を設定（オプション）
    c.header('Content-Disposition', 'attachment; filename="data.csv"')
    try {
        const csvData = await readFile(filePath)  // ファイルを非同期で読み込む

        
        // CSVデータをレスポンスとして返す
        return c.body(csvData)
    } catch (error) {
        // エラーハンドリング
        return c.text('File not found', 404)
    }
    })

    app.get('/hello', (c) => {
    return c.text('Hello Hono!')
    })
}

export default routing
