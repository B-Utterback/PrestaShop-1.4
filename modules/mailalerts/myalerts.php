<?php

/* SSL Management */
$useSSL = true;

include(dirname(__FILE__).'/../../config/config.inc.php');
include(dirname(__FILE__).'/../../header.php');
include_once(dirname(__FILE__).'/mailalerts.php');

$errors = array();

if ($cookie->isLogged())
{
	if (Tools::getValue('action') == 'delete')
	{
		$id_customer = intval($cookie->id_customer);
		if (!$id_product = intval(Tools::getValue('id_product')))
			$errors[] = Tools::displayError('You need a product to delete an alert'); 
		$id_product_attribute = intval(Tools::getValue('id_product_attribute'));
		$customer = new Customer(intval($id_customer));
		MailAlerts::deleteAlert(intval($id_customer), 0, intval($id_product), intval($id_product_attribute));
	}
	$smarty->assign('alerts', MailAlerts::getProductsAlerts(intval($cookie->id_customer), intval($cookie->id_lang)));
}
else
	$errors[] = Tools::displayError('You need to be logged to manage your alerts'); 

$smarty->assign('id_customer', intval($cookie->id_customer));
$smarty->assign('errors', $errors);
$smarty->display(dirname(__FILE__).'/myalerts.tpl');

include(dirname(__FILE__).'/../../footer.php');
