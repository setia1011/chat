<?php include './theme/header.php'; ?>
<?php include './theme/content-start.php'; ?>
<?php 

$faker = Faker\Factory::create();
$user = ['username' => $faker->name];
$user['id'] = md5($user['username']);

?>

<div class="starter-template">
        <!-- <div class="chat_dialog">

            <ul class="typing_indicator"></ul>
        </div>
        <select class="user_list" multiple></select>
        <div class="clear">&nbsp;</div> -->

        <div class="alert alert-danger connection_alert" role="alert">
            <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            <span class="sr-only">Error:</span>
            Currently there is no connection to the server. <br />
            <span class="error_type"></span>
            <span class="error_reconnect_msg">reconnecting in</span>
            <span class="error_reconnect_countdown">10</span>
        </div>

        <div class="input-group client">
            <!-- <span class="input-group-addon name_bit" id="basic-addon3">
                <span class="client_user_you"><?php print $user['username']; ?></span>
                &nbsp;&gt;&gt;&nbsp;<span class="name_bit chat_target"></span>
            </span> -->

            <!-- <input type="text" class="form-control client_chat" placeholder="Type your message..."> -->
            <!-- <span class="input-group-btn">
                <button class="btn btn-default btn-send chat_btn" type="button">Go!</button>
            </span> -->
        </div><!--/input-group -->
    </div>

<div id="vuechat" class="nk-chat">
    <div class="nk-chat-aside">
        <div class="nk-chat-aside-head">
            <div class="nk-chat-aside-user">
                <div class="dropdown">
                    <!-- <div class="user-avatar">
                        <img src="<?php echo siteurl; ?>theme/images/avatar/b-sm.jpg" alt="">
                    </div> -->
                    <div class="title">Chats</div>
                </div>
            </div><!-- .nk-chat-aside-user -->
        </div><!-- .nk-chat-aside-head -->
        <div class="nk-chat-aside-body" data-simplebar>
            <div class="nk-chat-aside-search">
                <div class="form-group">
                    <div class="form-control-wrap">
                        <div class="form-icon form-icon-left">
                            <em class="icon ni ni-search"></em>
                        </div>
                        <input type="text" class="form-control form-round" id="default-03" placeholder="Cari ...">
                    </div>
                </div>
            </div><!-- .nk-chat-aside-search -->
            <!-- <div>
                <select class="user_list" multiple></select>
                <div class="clear">&nbsp;</div>
            </div> -->
            <div class="nk-chat-list">
                <input type="hidden" class="name_bit chat_target"></input>
                <h6 class="title overline-title-alt">Messages</h6>
                <ul class="chat-list user-list-x">
                    <!-- <li class="chat-item">
                        <a class="chat-link chat-open" href="#">
                            <div class="chat-media user-avatar bg-purple">
                                <span>IH</span>
                                <span class="status dot dot-lg dot-gray"></span>
                            </div>
                            <div class="chat-info">
                                <div class="chat-from">
                                    <div class="name">Setiadi</div>
                                    <span class="time">Now</span>
                                </div>
                                <div class="chat-context">
                                    <div class="text">
                                        <p>You: Please confrim if you got my last messages.</p>
                                    </div>
                                    <div class="status unread">
                                        <em class="icon ni ni-bullet-fill"></em>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li class="chat-item is-unread">
                        <a class="chat-link chat-open" href="#">
                            <div class="chat-media user-avatar">
                                <span>AB</span>
                                <span class="status dot dot-lg dot-gray"></span>
                            </div>
                            <div class="chat-info">
                                <div class="chat-from">
                                    <div class="name">Abu Bin Ishtiyak</div>
                                    <span class="time">4:49 AM</span>
                                </div>
                                <div class="chat-context">
                                    <div class="text">
                                        <p>Hi, I am Ishtiyak, can you help me with this problem ?</p>
                                    </div>
                                    <div class="status unread">
                                        <em class="icon ni ni-bullet-fill"></em>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li> -->
                </ul><!-- .chat-list -->
            </div><!-- .nk-chat-list -->
        </div>
    </div><!-- .nk-chat-aside -->
    <div class="nk-chat-body profile-shown">
        <div class="nk-chat-head">
            <ul class="nk-chat-head-info">
                <li class="nk-chat-body-close">
                    <a href="#" class="btn btn-icon btn-trigger nk-chat-hide ms-n1"><em class="icon ni ni-arrow-left"></em></a>
                </li>
                <li class="nk-chat-head-user">
                    <div class="user-card">
                        <div class="user-avatar bg-purple">
                            <span>IH</span>
                        </div>
                        <div class="user-info">
                            <div class="lead-text"><?php echo $user['username']; ?></div>
                            <div class="sub-text"><span class="d-none d-sm-inline me-1">Active </span> 35m ago</div>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="nk-chat-head-tools">
                <li><a href="#" class="btn btn-icon btn-trigger text-primary"><em class="icon ni ni-call-fill"></em></a></li>
                <li class="me-n1 me-md-n2"><a href="#" class="btn btn-icon btn-trigger text-primary chat-profile-toggle"><em class="icon ni ni-alert-circle-fill"></em></a></li>
            </ul>
            <div class="nk-chat-head-search">
                <div class="form-group">
                    <div class="form-control-wrap">
                        <div class="form-icon form-icon-left">
                            <em class="icon ni ni-search"></em>
                        </div>
                        <input type="text" class="form-control form-round" id="chat-search" placeholder="Search in Conversation">
                    </div>
                </div>
            </div><!-- .nk-chat-head-search -->
        </div><!-- .nk-chat-head -->
        <div class="nk-chat-panel chat_dialog" data-simplebar>
            <div class="typing-indicator"></div>
            <!-- <div class="chat is-you">
                <div class="chat-content">
                    <div class="chat-bubbles">
                        <div class="chat-bubble">
                            <div class="chat-msg"> Hello! </div>
                        </div>
                        <div class="chat-bubble">
                            <div class="chat-msg"> I found an issues when try to purchase the product. </div>
                        </div>
                    </div>
                    <ul class="chat-meta">
                        <li>Setiadi</li>
                        <li>29 Apr, 2020 4:28 PM</li>
                    </ul>
                </div>
            </div>
            <div class="chat is-me">
                <div class="chat-content">
                    <div class="chat-bubbles">
                        <div class="chat-bubble">
                            <div class="chat-msg"> Thanks for inform. We just solved the issues. Please check now. </div>
                        </div>
                    </div>
                    <ul class="chat-meta">
                        <li>Abu Bin Ishtiyak</li>
                        <li>29 Apr, 2020 4:12 PM</li>
                    </ul>
                </div>
            </div>
            <div class="chat is-you">
                <div class="chat-content">
                    <div class="chat-bubbles">
                        <div class="chat-bubble">
                            <div class="chat-msg"> This is really cool. </div>
                        </div>
                        <div class="chat-bubble">
                            <div class="chat-msg"> It’s perfect. Thanks for letting me know. </div>
                        </div>
                    </div>
                    <ul class="chat-meta">
                        <li>Setiadi</li>
                        <li>29 Apr, 2020 4:28 PM</li>
                    </ul>
                </div>
            </div> -->
        </div><!-- .nk-chat-panel -->
        <div class="nk-chat-editor">
            <div class="nk-chat-editor-upload  ms-n1">
                <a href="#" class="btn btn-sm btn-icon btn-trigger text-primary toggle-opt" data-target="chat-upload"><em class="icon ni ni-plus-circle-fill"></em></a>
                <div class="chat-upload-option" data-content="chat-upload">
                    <ul class="">
                        <li><a href="#"><em class="icon ni ni-img-fill"></em></a></li>
                        <li><a href="#"><em class="icon ni ni-camera-fill"></em></a></li>
                        <li><a href="#"><em class="icon ni ni-mic"></em></a></li>
                        <li><a href="#"><em class="icon ni ni-grid-sq"></em></a></li>
                    </ul>
                </div>
            </div>
            <div class="nk-chat-editor-form">
                <div class="form-control-wrap">
                    <textarea class="form-control client_chat form-control-simple no-resize" rows="1" id="default-textarea" placeholder="Type your message..."></textarea>
                </div>
            </div>
            <ul class="nk-chat-editor-tools g-2">
                <li>
                    <button class="btn btn-round btn-primary btn-icon btn-send chat_btn"><em class="icon ni ni-send-alt"></em></button>
                </li>
            </ul>
        </div><!-- .nk-chat-editor -->
        <div class="nk-chat-profile visible" data-simplebar>
            <div class="user-card user-card-s2 my-4">
                <div class="user-avatar md bg-purple">
                    <span>IH</span>
                </div>
                <div class="user-info">
                    <h5>Setiadi</h5>
                    <span class="sub-text">Active 35m ago</span>
                </div>
            </div>
            <div class="chat-profile">
                <div class="chat-profile-group">
                    <a href="#" class="chat-profile-head" data-bs-toggle="collapse" data-bs-target="#chat-options">
                        <h6 class="title overline-title">Informasi</h6>
                        <span class="indicator-icon"><em class="icon ni ni-chevron-down"></em></span>
                    </a>
                    <div class="chat-profile-body collapse show" id="chat-options">
                        <div class="chat-profile-body-inner">
                            Test
                        </div>
                    </div>
                </div><!-- .chat-profile-group -->
            </div> <!-- .chat-profile -->
        </div><!-- .nk-chat-profile -->
    </div><!-- .nk-chat-body -->
</div><!-- .nk-chat -->

<?php include './theme/content-end.php'; ?>         
<?php include './theme/footer.php'; ?>

<script type="text/javascript" src="<?php echo siteurl; ?>js/dom.js"></script>
<script type="text/javascript" src="<?php echo siteurl; ?>js/websockets.js"></script>
<script type="text/javascript" src="<?php echo siteurl; ?>js/interface.js"></script>

<script type="text/javascript">
    let socketHost = '<?php print WEBSOCKET_SERVER_IP ?>';
    let socketPort = '<?php print WEBSOCKET_SERVER_PORT ?>';
    let chat_user  = JSON.parse('<?php print addslashes(json_encode($user)); ?>');
</script>