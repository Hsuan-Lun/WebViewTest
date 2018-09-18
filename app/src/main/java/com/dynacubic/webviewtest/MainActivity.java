package com.dynacubic.webviewtest;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
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
        wv.getSettings().setUseWideViewPort(true);
        wv.getSettings().setLoadWithOverviewMode(true);
        wv.getSettings().setSupportZoom(false);
        wv.getSettings().setBuiltInZoomControls(false);
        wv.getSettings().setDisplayZoomControls(true);
        wv.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        wv.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE);
        wv.getSettings().setAllowFileAccess(true);
        wv.getSettings().setDomStorageEnabled(true);
        wv.loadUrl("file:///android_asset/www/index.html");
        //wv.loadUrl("http://www.choisfit-taiwan.com/");
        //wv.setWebViewClient(new MyWebViewClient());
        wv.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress){
                super.onProgressChanged(view, newProgress);
            }

            @Override
            public void onReceivedTitle(WebView view, String title){
                super.onReceivedTitle(view, title);
            }

            @Override
            public boolean onJsAlert(WebView view, String url, String message, JsResult result){
                return super.onJsAlert(view, url, message, result);
            }

        });
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

