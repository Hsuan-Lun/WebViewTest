package com.dynacubic.webviewtest;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;


public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        getSupportActionBar().hide();
        //getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_FULLSCREEN);

        WebView wv = (WebView) findViewById(R.id.webview);
        wv.getSettings().setJavaScriptEnabled(true);
        wv.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        wv.loadUrl("file:///android_asset/www/index.html");
        //wv.loadUrl("http://www.choisfit-taiwan.com/");
        wv.setWebViewClient(new MyWebViewClient());
        wv.getSettings().setDomStorageEnabled(true);
        /*
        wv.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
            view.loadUrl(url);
            return false;
        }
        });
        */
    }
/*
    @Override
    public void onBackPressed() {
        if(wv.canGoBack()) {
            wv.goBack();
        } else {
            super.onBackPressed();
        };
    }
    */

}

