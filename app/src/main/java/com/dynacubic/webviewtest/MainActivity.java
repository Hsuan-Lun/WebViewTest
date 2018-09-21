package com.dynacubic.webviewtest;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.webkit.JsPromptResult;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.EditText;
import android.widget.TextView;


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
            public boolean onJsAlert(WebView view, String url, String message, final JsResult result){
                AlertDialog.Builder b = new AlertDialog.Builder(MainActivity.this);
                b.setTitle("Alert");
                b.setMessage(message);
                b.setPositiveButton(android.R.string.ok, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        result.confirm();
                    }
                });
                b.setCancelable(false);
                b.create().show();
                return true;
                //return super.onJsAlert(view, url, message, result);
            }

            @Override
            public boolean onJsConfirm(WebView view, String url, String message, final JsResult result) {
                AlertDialog.Builder b = new AlertDialog.Builder(MainActivity.this);
                b.setTitle("Confirm");
                b.setMessage(message);
                b.setPositiveButton(android.R.string.ok, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        result.confirm();
                    }
                });
                b.setNegativeButton(android.R.string.cancel, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        result.cancel();
                    }
                });
                b.create().show();
                return true;
            }

            @Override
            public boolean onJsPrompt(WebView view, String url, String message, String defaultValue, final JsPromptResult result) {
                final View v = View.inflate(MainActivity.this, R.layout.prompt_dialog, null);
                ((TextView) v.findViewById(R.id.prompt_message_text)).setText(message);
                ((EditText) v.findViewById(R.id.prompt_input_field)).setText(defaultValue);
                AlertDialog.Builder b = new AlertDialog.Builder(MainActivity.this);
                b.setTitle("Prompt");
                b.setView(v);
                b.setPositiveButton(android.R.string.ok, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        String value = ((EditText) v.findViewById(R.id.prompt_input_field)).getText().toString();
                        result.confirm(value);
                    }
                });
                b.setNegativeButton(android.R.string.cancel, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        result.cancel();
                    }
                });
                b.create().show();
                return true;
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

